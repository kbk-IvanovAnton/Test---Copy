# type: ignore

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Travel(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    travelName: so.Mapped[str] = so.mapped_column(sa.String(), nullable=False, default=None)
    is_show: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=True, index=True)
    order: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False, index=True, default=1)

    orders = db.relationship("Order", back_populates="travels_id", cascade="all, delete-orphan")

    def __repr__(self):
        return "<Travel {}>".format(self.id)
