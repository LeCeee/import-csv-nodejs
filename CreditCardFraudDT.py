
# coding: utf-8

# In[1]:


from sklearn.model_selection import StratifiedShuffleSplit
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, Normalizer, scale
from sklearn.metrics import classification_report
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import export_graphviz
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as  np


# In[2]:


creditcard = pd.read_csv('cleanData.csv')
creditcard.columns = [x.lower() for x in creditcard.columns]
creditcard.rename(columns = {'class' : 'fraud'}, inplace = True)
creditcard


# In[3]:


creditcard.fraud.value_counts(dropna = False)


# In[4]:


creditcard.groupby('fraud').amount.mean()


# In[5]:


creditcard.drop('time' , axis = 1, inplace = True)


# In[6]:


scaler = StandardScaler()
creditcard['amount'] = scaler.fit_transform(creditcard['amount'].values.reshape(-1,1))


# In[7]:


X = creditcard.iloc[:,:-1]
y = creditcard.iloc[:, -1]
Xtrain, Xtest, Ytrain, Ytest = train_test_split(X, y, test_size = .30, stratify = y, random_state = 1)


# In[9]:


clf = DecisionTreeClassifier()
clf.fit(Xtrain, Ytrain)


# In[10]:


import pydotplus
dot_data = export_graphviz(clf, out_file = None)
graph = pydotplus.graph_from_dot_data(dot_data)
graph.write_pdf("DT.pdf")


# In[11]:


y_train_pred = clf.predict(Xtrain)
y_test_pred = clf.predict(Xtest)


# In[12]:


from sklearn.metrics import confusion_matrix


# In[14]:


confusion_matrix(Ytrain, y_train_pred)


# In[16]:


confusion_matrix(Ytest, y_test_pred)


# In[17]:


from sklearn.metrics import classification_report
from  sklearn.metrics import precision_recall_fscore_support


def pandas_classification_report(y_true, y_pred):
    metrics_summary = precision_recall_fscore_support(
            y_true=y_true, 
            y_pred=y_pred)

    avg = list(precision_recall_fscore_support(
            y_true=y_true, 
            y_pred=y_pred,
            average='weighted'))

    metrics_sum_index = ['precision', 'recall', 'f1-score', 'support']
    class_report_df = pd.DataFrame(
        list(metrics_summary),
        index=metrics_sum_index)

    support = class_report_df.loc['support']
    total = support.sum() 
    avg[-1] = total

    class_report_df['avg / total'] = avg

    return class_report_df.T


# In[19]:


print(classification_report(y_true=Ytest, y_pred=y_test_pred, digits=6))


# In[21]:


df_class_report = pandas_classification_report(y_true=Ytest, y_pred=y_test_pred)
print(df_class_report)
df_class_report.to_csv('classDT.csv',  sep=',')


# In[23]:


clf.score(Xtest,Ytest)


# In[24]:


clf.score(Xtrain,Ytrain)


# In[25]:


df = pd.DataFrame({'Class':y_test_pred, 'Feature' : Xtest['amount'] })
df.head()


# In[26]:


df.to_csv("Predict_DT.csv")

