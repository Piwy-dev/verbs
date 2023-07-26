from verbs_data import verbs_en, verbs_nl
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