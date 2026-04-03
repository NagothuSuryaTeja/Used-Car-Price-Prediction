import pickle
import pandas as pd

def prediction(items):
    C = pd.DataFrame(items)
    with open('./models/preprocessor.pkl', 'rb') as file:
        preprocessor = pickle.load(file)

    with open('./models/Xgboost_Regressor_model.pkl', 'rb') as file:
        model = pickle.load(file)

    with open('./models/LabelEncoder.pkl', 'rb') as file:
        encoder = pickle.load(file)

    C['model'] = encoder.transform(C['model'])
    C = preprocessor.transform(C)
    pred = model.predict(C)
    pred = int(pred[0])
    return pred