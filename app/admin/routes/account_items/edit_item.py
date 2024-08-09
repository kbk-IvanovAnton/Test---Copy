from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.account_items import AccountItems


@bp.route("/admin_menu/edit_account_item", methods=["POST"])
def edit_item():
    data = request.json
    item = AccountItems.query.get(data["id"])
    if item:
        item.supportedTypeName = data["name"]
        item.is_show = bool(data["is_show_account_item"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
