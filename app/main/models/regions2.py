from typing import Dict

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Regions2(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False, default=None)
    allowance: so.Mapped[Dict[str, int]] = so.mapped_column(sa.JSON, nullable=False, default=dict)
    order: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False, index=True, default=1)
    is_show: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=True, index=True)

    def __repr__(self):
        return "<Regions2 {}>".format(self.id)
