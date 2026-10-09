from pydantic import BaseModel


# =========================
# Product Schemas
# =========================

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    category: str
    price: float
    rating: float = 0.0
    image_url: str | None = None
    stock: int = 0

class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# User Schemas
# =========================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


# =========================
# Cart Schemas
# =========================

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1


class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    id: int
    user_id: int
    items: list[CartItemResponse] = []

    class Config:
        from_attributes = True