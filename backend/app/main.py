from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.products import router as product_router
from .routes.auth import router as auth_router
from .routes.cart import router as cart_router

import webbrowser
import threading


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Amazon Clone API",
    description="Backend API for Amazon Clone",
    version="1.0.0"
)


# Allow the frontend (Live Server / local development)
# to communicate with the FastAPI backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(product_router)
app.include_router(auth_router)
app.include_router(cart_router)


@app.get("/")
def root():
    return {
        "message": "Amazon Clone API is running"
    }


def open_browser():
    webbrowser.open("http://127.0.0.1:8000/docs")


threading.Timer(1.5, open_browser).start()
