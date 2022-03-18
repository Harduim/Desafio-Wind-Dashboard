import numpy as np
from scipy.stats import linregress
from sklearn.metrics import mean_squared_error

serie_a = np.array([1, 2, 3, 4, 5, 6])
serie_b = np.array([2, 4, 6, 8, 10, 12])

print("Variancia serie_A:\t", serie_a.var())
print("Variancia serie_B:\t", serie_b.var())
print("")
print("Desvio padrão serie_A:\t", serie_a.std())
print("Desvio padrão serie_B:\t", serie_b.std())
print("")

# https://numpy.org/doc/stable/reference/generated/numpy.cov.html
print("Covariância:\t", np.cov(serie_a, serie_b, bias=True)[0][1])
print("")

# squared: If True returns MSE value, if False returns RMSE value.
print("RMSE:\t", mean_squared_error(serie_a, serie_b, squared=False))
print("")

print("Regressão linear simples A=>B:\t", linregress(serie_a, serie_b))
print("Regressão linear simples B=>A:\t", linregress(serie_b, serie_a))