from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.supported_types import SupportedTypes


@bp.route("/admin_menu/edit_supported_type", methods=["POST"])
def edit_type():
    data = request.json
    types = SupportedTypes.query.get(data["id"])
    if types:
        types.supportedTypeName = data["name"]
        types.is_show = bool(data["is_show_supported_type"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
