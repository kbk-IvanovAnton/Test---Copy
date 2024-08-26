import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowancePricesJapan(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default=None)
    allowance: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False, default=0)
    note: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default=None)
    is_show: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=True, index=True)

    def __repr__(self):
        return "<AllowancePricesJapan {}>".format(self.id)
