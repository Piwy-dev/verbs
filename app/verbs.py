from app.verbs_data import verbs_en, verbs_nl
import random


def get_random_verb(lang: str) -> dict:
    """
    Returns a random verb from the selected verbs list.

    Args:
        - `lang` (str) : The language of the verbs list.
    """
    if lang == 'en':
        return random.choice(verbs_en)
    elif lang == 'nl':
        return random.choice(verbs_nl)
    

def get_verb(lang: str, verb: str) -> dict:
    """
    Returns a verb from the verbs list.
    """
    if lang == 'en':
        for v in verbs_en:
            if v['infinitive'] == verb:
                return v
    elif lang == 'nl':
        for v in verbs_nl:
            if v['infinitive'] == verb:
                return v
            

def get_exercise(startlang: str, endlang: str, tense: int) -> list:
    """
    Returns a list of 20 verbs for the exercises.
    The verbs are selected from verbs_en or verbs_nl depending on the startlang and endlang parameters.
    The representation of a verbe inside verbs_en or verbs_nl is a list sorted like this:
    [infinitive en or nl, past simple, past participle, infinitive fr, translation fr, translation en or nl]
    The returned list only contains the needed forms of the verbs in a tulpe sorted like this:
    (verb displayed, verb to verify)

    Args:
        - `startlang` (str) : The language of the verbs list.
        - `endlang` (str) : The language of the translation.
        - `tense` (int) : The tense of the verb (0: translation, 1: past simple, 2: past participle)

    Returns:
        A list of 20 verbs.

    Exemple:
    >>> get_exercise('fr', 'en', 0)
    [(avoir, have), (être, be), (faire, do), (aller, go) ...]
    """
    verbs = []
    keeper = []
    if tense == 0: # translation
        if startlang == 'en' or endlang == 'en':
            verb_list = verbs_en
        elif startlang == 'nl' or endlang == 'nl':
            verb_list = verbs_nl
        for i in range(20):
            rd = random.randint(0, len(verb_list)-1)
            while rd in keeper:
                rd = random.randint(0, len(verb_list)-1)
            keeper.append(rd)
            if startlang == 'fr':     
                verbs.append((verb_list[rd][3], verb_list[rd][5]))
            elif startlang == 'en' or startlang == 'nl':
                verbs.append((verb_list[rd][0], verb_list[rd][4]))
    elif tense == 1: # impefect
        if startlang == 'en':
            verb_list = verbs_en
        elif startlang == 'nl':
            verb_list = verbs_nl
        for i in range(20):
            rd = random.randint(0, len(verb_list)-1)
            while rd in keeper:
                rd = random.randint(0, len(verb_list)-1)
            keeper.append(rd)
            verbs.append((verb_list[rd][0], verb_list[rd][1]))
    elif tense == 2: # past participle
        if startlang == 'en':
            verb_list = verbs_en
        elif startlang == 'nl':
            verb_list = verbs_nl
        for i in range(20):
            rd = random.randint(0, len(verb_list)-1)
            while rd in keeper:
                rd = random.randint(0, len(verb_list)-1)
            keeper.append(rd)
            verbs.append((verb_list[rd][0], verb_list[rd][2]))
    return verbs
            

def verify_answer(answer: str, tense: int, verb: list) -> bool:
    """
    Verifies if the answer is correct.

    Args:
        - `answer` (str) : The answer given by the user.
        - `tense` (int) : The tense of the verb (0: infinitive, 1: past simple, 2: past participle, 3: translation)
        - `verb` (dict) : The verb to verify.

    Returns:
        `True` if the answer is correct, `False` otherwise.
    """
    if answer in verb[tense].split(','):
        return True
    return False