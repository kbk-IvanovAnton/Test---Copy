import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.supported_types import SupportedTypes


@bp.route("/admin_menu/supported_types_table")
@login_required
def supported_types_table():
    supported_types = db.session.scalars(
        sa.select(SupportedTypes).order_by(SupportedTypes.order)
    ).all()
    return render_template(
        "admin/supported_types_table.html",
        title="Supported Types Table",
        supported_types=supported_types,
    )
