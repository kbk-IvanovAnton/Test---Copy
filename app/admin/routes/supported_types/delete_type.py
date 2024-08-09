from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.supported_types import SupportedTypes


@bp.route("/admin_menu/delete_supported_type", methods=["POST"])
def delete_type():
    data = request.json
    types = SupportedTypes.query.get(data["id"])
    if types:
        db.session.delete(types)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
