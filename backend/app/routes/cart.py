from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Cart, CartItem, Product, User
from ..schemas import CartItemCreate, CartResponse
from .auth import get_current_user


router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


# Get or create cart for logged-in user
def get_or_create_cart(
    user: User,
    db: Session
):
    cart = db.query(Cart).filter(
        Cart.user_id == user.id
    ).first()

    if not cart:
        cart = Cart(
            user_id=user.id
        )

        db.add(cart)
        db.commit()
        db.refresh(cart)

    return cart


# GET CART
@router.get("/", response_model=CartResponse)
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = get_or_create_cart(
        current_user,
        db
    )

    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items
    }


# ADD ITEM TO CART
@router.post("/items")
def add_to_cart(
    item_data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == item_data.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if item_data.quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than 0"
        )

    if item_data.quantity > product.stock:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    cart = get_or_create_cart(
        current_user,
        db
    )

    existing_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item_data.product_id
    ).first()

    if existing_item:
        new_quantity = existing_item.quantity + item_data.quantity

        if new_quantity > product.stock:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock"
            )

        existing_item.quantity = new_quantity

        db.commit()
        db.refresh(existing_item)

        return {
            "message": "Cart item quantity updated",
            "item": existing_item
        }

    new_item = CartItem(
        cart_id=cart.id,
        product_id=item_data.product_id,
        quantity=item_data.quantity
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return {
        "message": "Product added to cart",
        "item": new_item
    }


# UPDATE CART ITEM
@router.put("/items/{item_id}")
def update_cart_item(
    item_id: int,
    quantity: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = get_or_create_cart(
        current_user,
        db
    )

    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    if quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than 0"
        )

    product = db.query(Product).filter(
        Product.id == cart_item.product_id
    ).first()

    if quantity > product.stock:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    cart_item.quantity = quantity

    db.commit()
    db.refresh(cart_item)

    return {
        "message": "Cart item updated",
        "item": cart_item
    }


# DELETE CART ITEM
@router.delete("/items/{item_id}")
def delete_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart = get_or_create_cart(
        current_user,
        db
    )

    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)
    db.commit()

    return {
        "message": "Cart item removed successfully"
    }