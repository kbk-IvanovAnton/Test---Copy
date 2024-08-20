import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowanceSpecialCases(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    applying_date: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    unit_price: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False)
    days: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=False)

    allowances = db.relationship(
        "Allowances", back_populates="allowance_special_case", cascade="all, delete-orphan"
    )
