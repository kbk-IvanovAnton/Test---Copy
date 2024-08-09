# type: ignore

from datetime import date, datetime

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Order(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("user.id"), nullable=False
    )
    order: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    order_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    detail_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    is_hidden: so.Mapped[bool] = so.mapped_column(sa.Boolean(), nullable=False, default=False)
    fiscal_year: so.Mapped[int] = so.mapped_column(
        sa.Integer(), default=lambda: datetime.now().year
    )

    created_at: so.Mapped[date] = so.mapped_column(sa.Date(), default=date.today)
    service_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    service_card_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    quote_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    purchase_order_number: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    travel_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("travel.id"), nullable=False
    )
    support_type_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("supported_types.id"), nullable=False
    )

    user = db.relationship("User", back_populates="orders_rel")
    rates = db.relationship("Rates", back_populates="order", cascade="all, delete-orphan")
    details = db.relationship("Details", back_populates="order", cascade="all, delete-orphan")
    allowances = db.relationship(
        "Allowances", back_populates="order", cascade="all, delete-orphan"
    )
    travels_id = db.relationship("Travel", back_populates="orders")
    supported_type_id = db.relationship("SupportedTypes", back_populates="orders")

    def __repr__(self):
        return "<Order {}>".format(self.id)
