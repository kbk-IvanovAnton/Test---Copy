import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.account_items import AccountItems


@bp.route("/admin_menu/account_items_table")
@login_required
def account_items_table():
    account_items = db.session.scalars(sa.select(AccountItems).order_by(AccountItems.order)).all()
    return render_template(
        "admin/account_items_table.html", title="Account Items Table", account_items=account_items
    )
