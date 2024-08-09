import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Rates(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    order_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("order.id"), nullable=False
    )
    currency_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("currencies.id"), nullable=False, default=0
    )
    foreign_currency: so.Mapped[float] = so.mapped_column(sa.Float, nullable=False, default=0.0)
    temporary_payment: so.Mapped[float] = so.mapped_column(sa.Float, nullable=False, default=0.0)
    remaining_payment: so.Mapped[float] = so.mapped_column(sa.Float, nullable=False, default=0.0)

    order = db.relationship("Order", back_populates="rates")
    currency = db.relationship("Currencies", back_populates="rates")

    def __repr__(self):
        return "<Rates {}>".format(self.id)
