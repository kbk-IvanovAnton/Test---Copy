# type: ignore

import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Task(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    group: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    content: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    start: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    end: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)

    def __repr__(self):
        return "<Task {}>".format(self.id)
