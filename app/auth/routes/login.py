# type: ignore

from urllib.parse import urlsplit

import sqlalchemy as sa
from flask import flash, redirect, render_template, request, url_for
from flask_login import current_user, login_user

from app import db
from app.auth import bp
from app.auth.forms.login import LoginForm
from app.auth.models.user import User


@bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("main.index"))
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.scalar(sa.select(User).where(User.email == form.email.data))
        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            return redirect(url_for("auth.login"))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get("next")
        if not next_page or urlsplit(next_page).netloc != "":
            next_page = url_for("main.index")
        return redirect(next_page)
    return render_template("auth/login.html", title="Sign In", form=form)
