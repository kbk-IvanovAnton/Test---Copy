from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.supported_types import SupportedTypes


@bp.route("/admin_menu/add_supported_type", methods=["POST"])
def add_type():
    data = request.json
    new_type = SupportedTypes(supportedTypeName=data["supportedTypeName"])
    if new_type:
        db.session.add(new_type)
        max_order = db.session.query(func.max(SupportedTypes.order)).scalar() or 0
        new_type.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_type.id)
    return redirect(url_for("admin/travel_table"))
