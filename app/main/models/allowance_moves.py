import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class AllowanceMoves(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)

    allowances = db.relationship(
        "Allowances", back_populates="allowance_move", cascade="all, delete-orphan"
    )
