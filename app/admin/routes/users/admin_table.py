# type: ignore

import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.auth.models.user import User


@bp.route("/admin_table", methods=["GET", "POST"])
@login_required
def admin_table():
    users = db.session.scalars(sa.select(User)).all()
    return render_template("admin/admin_table.html", title="Admin Table", users=users)
