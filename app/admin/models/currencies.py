# type: ignore


import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Currencies(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(), nullable=False, default=None)
    prefix: so.Mapped[str] = so.mapped_column(sa.String(), default=None)
    suffix: so.Mapped[str] = so.mapped_column(sa.String(), default=None)
    code: so.Mapped[str] = so.mapped_column(sa.String(), nullable=False, default=None)
    decimal: so.Mapped[float] = so.mapped_column(sa.Float(), nullable=False)
    order: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False, index=True, default=1)
    is_show_japan: so.Mapped[bool] = so.mapped_column(sa.Boolean(), nullable=False, default=True)
    is_show_world: so.Mapped[bool] = so.mapped_column(sa.Boolean(), nullable=False, default=True)

    rates = db.relationship("Rates", back_populates="currency", cascade="all, delete-orphan")
    details = db.relationship("Details", back_populates="currency", cascade="all, delete-orphan")

    def __repr__(self):
        return "<Currencies {}>".format(self.id)
