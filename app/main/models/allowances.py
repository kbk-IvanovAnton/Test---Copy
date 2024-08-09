import sqlalchemy as sa
import sqlalchemy.orm as so

from app import db


class Allowances(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    order_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("order.id"), nullable=False
    )
    departure_date: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    return_date: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)
    allowance_move_id: so.Mapped[int] = so.mapped_column(
        sa.Integer, db.ForeignKey("allowance_moves.id"), nullable=False
    )
    # allowance_lodgment_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_lodgments.id"), nullable=False
    # )
    # allowance_work_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_works.id"), nullable=False
    # )
    # allowance_region_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_regions.id"), nullable=False
    # )
    # allowance_special_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_specials.id"), nullable=False
    # )
    # allowance_drive_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_drives.id"), nullable=False
    # )
    # allowance_special_case_id: so.Mapped[int] = so.mapped_column(
    #     sa.Integer, db.ForeignKey("allowance_special_cases.id"), nullable=False
    # )
    calendars: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=False)

    order = db.relationship("Order", back_populates="allowances")
    allowance_move = db.relationship("AllowanceMoves", back_populates="allowances")
    # allowance_lodgment = db.relationship("AllowanceLodgments", back_populates="allowances")
    # allowance_work = db.relationship("AllowanceWorks", back_populates="allowances")
    # allowance_region = db.relationship("AllowanceRegions", back_populates="allowances")
    # allowance_special = db.relationship("AllowanceSpecials", back_populates="allowances")
    # allowance_drive = db.relationship("AllowanceDrives", back_populates="allowances")
    # allowance_special_case = db.relationship("AllowanceSpecialCases", back_populates="allowances")

    def __repr__(self):
        return "<Allowances {}>".format(self.id)
