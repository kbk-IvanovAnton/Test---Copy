import datetime

from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import db
from app.main import bp
from app.main.forms.order import CompleteOrderForm


@bp.route("/create_order", methods=["GET", "POST"])
@login_required
def create_order():
    form = CompleteOrderForm(request.form)
    return render_template("main/create_order_japan.html", title="Create Order", form=form)
