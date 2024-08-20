from typing import Dict

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowanceSpecials(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    applying_dates: so.Mapped[Dict[int, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    unit_prices: so.Mapped[Dict[int, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    days: so.Mapped[Dict[int, int]] = so.mapped_column(sa.JSON, nullable=False, default=dict)

    allowances = db.relationship(
        "Allowances", back_populates="allowance_special", cascade="all, delete-orphan"
    )
