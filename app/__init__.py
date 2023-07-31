import os
from flask import *
from app import verbs


def create_app(test_config=None):
    """
    Create and configure the app.
    """
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    lang = 'fr'
    
    @app.route("/")
    def index():
        return redirect('/{}/home'.format(lang))
    
    @app.route("/<lang>/home")
    def home(lang):
        return render_template('/{}/home.html'.format(lang))
    
    @app.route("/<lang>/translation")
    def translation(lang):
        return render_template('/{}/translation.html'.format(lang))
    
    @app.route("/<lang>/imperfect")
    def imperfect(lang):
        return render_template('/{}/imperfect.html'.format(lang))
    
    @app.route("/<lang>/participle")
    def participle(lang):
        return render_template('/{}/participle.html'.format(lang))
    
    @app.route("/<lang>/exercise", methods=['GET', 'POST'])
    def exercise(lang):
        if request.method == 'POST':
            startlang = request.headers.get('startlang')
            endlang = request.headers.get('endlang')
            tense = int(request.headers.get('tense'))
            verbs_list = verbs.get_exercise(startlang, endlang, tense)
            return jsonify(verbs_list)
        else:
            return render_template('/{}/exercise.html'.format(lang))
        
    @app.route("/<lang>/results")
    def results(lang):
        return render_template('/{}/results.html'.format(lang))
    
    @app.route("/<lang>/terms")
    def terms(lang):
        return render_template('/{}/terms.html'.format(lang))
    
    @app.route("/<lang>/privacy")
    def privacy(lang):
        return render_template('/{}/privacy.html'.format(lang))
   
    return app
