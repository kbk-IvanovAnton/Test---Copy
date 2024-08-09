from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.account_items import AccountItems


@bp.route("/admin_menu/add_account_item", methods=["POST"])
def add_item():
    data = request.json
    new_item = AccountItems(accountItemName=data["accountItemName"])
    if new_item:
        db.session.add(new_item)
        max_order = db.session.query(func.max(AccountItems.order)).scalar() or 0
        new_item.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_item.id)
    return redirect(url_for("admin/travel_table"))
