import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Details(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    order_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("order.id"), nullable=False
    )
    row: so.Mapped[int] = so.mapped_column(sa.Integer, nullable=False)

    account_item_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("account_items.id"), nullable=False
    )
    content: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default="")

    applying_date: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default="")

    currency_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("currencies.id"), nullable=False, default=1
    )
    unit_price: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default="")

    quantity: so.Mapped[int] = so.mapped_column(sa.Integer, nullable=False, default=0)

    payment_method_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("payment_methods.id"), nullable=False
    )
    receipt_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("receipts.id"), nullable=False
    )
    remarks: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default="")

    order = db.relationship("Order", back_populates="details")
    account_item = db.relationship("AccountItems", back_populates="details")
    currency = db.relationship("Currencies", back_populates="details")
    payment_method = db.relationship("PaymentMethods", back_populates="details")
    receipt = db.relationship("Receipts", back_populates="details")

    def __repr__(self):
        return "<Details {}>".format(self.id)
