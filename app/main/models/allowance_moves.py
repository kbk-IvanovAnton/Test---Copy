from typing import Dict

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowanceMoves(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    location_ids: so.Mapped[Dict[str, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    applying_dates: so.Mapped[Dict[str, str]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    unit_prices: so.Mapped[Dict[str, int]] = so.mapped_column(
        sa.JSON, nullable=False, default=dict
    )
    days: so.Mapped[Dict[str, int]] = so.mapped_column(sa.JSON, nullable=False, default=dict)

    allowances = db.relationship(
        "Allowances", back_populates="allowance_move", cascade="all, delete-orphan"
    )
