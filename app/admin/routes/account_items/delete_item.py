from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.account_items import AccountItems


@bp.route("/admin_menu/delete_account_item", methods=["POST"])
def delete_item():
    data = request.json
    item = AccountItems.query.get(data["id"])
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
