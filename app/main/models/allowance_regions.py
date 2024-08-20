from typing import Dict

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowanceRegions(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    region_id: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False)
    applying_dates: so.Mapped[Dict[int, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    unit_prices: so.Mapped[Dict[int, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    days: so.Mapped[Dict[int, int]] = so.mapped_column(sa.JSON, nullable=False, default=dict)

    allowances = db.relationship(
        "Allowances", back_populates="allowance_region", cascade="all, delete-orphan"
    )
