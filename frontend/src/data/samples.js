// Pre-packaged sample datasets represented as CSV strings
// These can be converted to Blobs and uploaded via FormData to simulate real file uploads.

export const SAMPLES = {
  iris: {
    name: "Iris Flower Dataset",
    description: "Classic multi-class classification problem. Predict the iris species (Setosa, Versicolor, Virginica) based on flower measurements.",
    filename: "iris_dataset.csv",
    target: "species",
    taskType: "classification",
    csv: `sepal_length,sepal_width,petal_length,petal_width,species
5.1,3.5,1.4,0.2,setosa
4.9,3.0,1.4,0.2,setosa
4.7,3.2,1.3,0.2,setosa
4.6,3.1,1.5,0.2,setosa
5.0,3.6,1.4,0.2,setosa
5.4,3.9,1.7,0.4,setosa
4.6,3.4,1.4,0.3,setosa
5.0,3.4,1.5,0.2,setosa
4.4,2.9,1.4,0.2,setosa
4.9,3.1,1.5,0.1,setosa
7.0,3.2,4.7,1.4,versicolor
6.4,3.2,4.5,1.5,versicolor
6.9,3.1,4.9,1.5,versicolor
5.5,2.3,4.0,1.3,versicolor
6.5,2.8,4.6,1.5,versicolor
5.7,2.8,4.5,1.3,versicolor
6.3,3.3,4.7,1.6,versicolor
4.9,2.4,3.3,1.0,versicolor
6.6,2.9,4.6,1.3,versicolor
5.2,2.7,3.9,1.4,versicolor
6.3,3.3,6.0,2.5,virginica
5.8,2.7,5.1,1.9,virginica
7.1,3.0,5.9,2.1,virginica
6.3,2.9,5.6,1.8,virginica
6.5,3.0,5.8,2.2,virginica
7.6,3.0,6.6,2.1,virginica
4.9,2.5,4.5,1.7,virginica
7.3,2.9,6.3,1.8,virginica
6.7,2.5,5.8,1.8,virginica
7.2,3.6,6.1,2.5,virginica`
  },

  boston: {
    name: "Boston Housing Lite",
    description: "Regression problem. Predict the median value of owner-occupied homes (in $1000s) based on neighborhood features.",
    filename: "boston_housing.csv",
    target: "medv",
    taskType: "regression",
    csv: `crim,zn,indus,chas,nox,rm,age,dis,rad,tax,ptratio,lstat,medv
0.00632,18.0,2.31,0,0.538,6.575,65.2,4.0900,1,296,15.3,4.98,24.0
0.02731,0.0,7.07,0,0.469,6.421,78.9,4.9671,2,242,17.8,9.14,21.6
0.02729,0.0,7.07,0,0.469,7.185,61.1,4.9671,2,242,17.8,4.03,34.7
0.03237,0.0,2.18,0,0.458,6.998,45.8,6.0622,3,222,18.7,2.94,33.4
0.06905,0.0,2.18,0,0.458,7.147,54.2,6.0622,3,222,18.7,5.33,36.2
0.02985,0.0,2.18,0,0.458,6.430,58.7,6.0622,3,222,18.7,5.21,28.7
0.08829,12.5,7.87,0,0.524,6.012,66.6,5.5605,5,311,15.2,12.43,22.9
0.14455,12.5,7.87,0,0.524,6.172,96.1,5.9505,5,311,15.2,19.15,27.1
0.21124,12.5,7.87,0,0.524,5.631,100.0,6.0821,5,311,15.2,29.93,16.5
0.17004,12.5,7.87,0,0.524,6.004,85.9,6.5921,5,311,15.2,17.10,18.9
0.22489,12.5,7.87,0,0.524,6.377,94.3,6.3467,5,311,15.2,20.45,15.0
0.11747,12.5,7.87,0,0.524,6.009,82.9,6.2267,5,311,15.2,13.27,18.9
0.09378,12.5,7.87,0,0.524,5.889,39.0,5.4509,5,311,15.2,15.71,21.7
0.62976,0.0,8.14,0,0.538,5.949,61.8,4.7075,4,307,21.0,8.26,20.4
0.63796,0.0,8.14,0,0.538,6.096,84.5,4.4619,4,307,21.0,10.26,18.2
0.62739,0.0,8.14,0,0.538,5.834,56.5,4.4986,4,307,21.0,8.47,19.9
0.10574,0.0,27.74,0,0.609,5.983,90.8,1.8681,4,711,20.1,18.07,13.6
0.20785,0.0,27.74,0,0.609,5.926,97.4,1.8206,4,711,20.1,18.13,13.9
0.10574,0.0,27.74,0,0.609,5.983,90.8,1.8681,4,711,20.1,18.07,13.6
0.32982,0.0,21.89,0,0.624,5.683,33.0,5.1167,4,437,21.2,11.38,19.6
0.43790,0.0,21.89,0,0.624,5.949,42.0,5.2873,4,437,21.2,8.26,23.1
0.53796,0.0,21.89,0,0.624,6.096,65.5,5.1167,4,437,21.2,10.26,21.2
0.62739,0.0,21.89,0,0.624,5.834,56.5,5.1167,4,437,21.2,8.47,19.9
0.98843,0.0,8.14,0,0.538,5.813,100.0,4.0952,4,307,21.0,19.88,14.5
0.75026,0.0,8.14,0,0.538,5.990,95.4,3.7979,4,307,21.0,16.30,15.6
0.84054,0.0,8.14,0,0.538,5.599,85.7,3.7979,4,307,21.0,16.51,13.9
0.67191,0.0,8.14,0,0.538,5.813,90.3,4.6820,4,307,21.0,14.81,16.6
0.95577,0.0,8.14,0,0.538,6.047,88.8,4.4534,4,307,21.0,17.28,14.8
0.77299,0.0,8.14,0,0.538,6.495,94.4,4.4547,4,307,21.0,12.80,18.4
1.00242,0.0,8.14,0,0.538,5.987,82.0,4.4986,4,307,21.0,14.81,16.0`
  },

  churn: {
    name: "Customer Churn Dataset",
    description: "Binary classification problem. Predict whether a telecom customer will churn (leave the service) based on tenure and usage patterns.",
    filename: "customer_churn.csv",
    target: "churn",
    taskType: "classification",
    csv: `tenure,monthly_charges,total_charges,contract_type,tech_support,paperless_billing,churn
1,29.85,29.85,month-to-month,no,yes,0
34,56.95,1889.5,one-year,yes,no,0
2,53.85,108.15,month-to-month,no,yes,1
45,42.3,1840.75,one-year,yes,no,0
2,70.7,151.65,month-to-month,no,yes,1
8,99.65,820.5,month-to-month,no,yes,1
22,89.1,1949.4,one-year,no,yes,0
10,29.75,301.9,month-to-month,no,no,0
28,104.8,3046.05,month-to-month,yes,yes,1
62,56.15,3487.95,two-year,no,no,0
13,49.95,587.45,month-to-month,no,yes,0
16,18.95,325.3,two-year,no,no,0
58,100.35,5681.1,one-year,no,no,0
49,103.7,5036.3,month-to-month,no,yes,1
25,105.5,2686.05,month-to-month,yes,yes,0
69,113.25,7895.15,two-year,yes,no,0
52,20.65,1022.95,one-year,no,no,0
71,106.7,7382.25,two-year,yes,no,0
10,55.2,528.35,month-to-month,no,yes,1
21,90.05,1862.9,month-to-month,no,yes,0
1,39.65,39.65,month-to-month,no,no,1
12,19.8,202.25,one-year,no,no,0
1,20.15,20.15,month-to-month,no,no,1
58,59.9,3505.1,two-year,yes,yes,0
49,59.6,2970.3,one-year,yes,no,0
30,55.0,1640.7,month-to-month,yes,yes,0
47,99.35,4749.15,month-to-month,no,yes,1
1,30.2,30.2,month-to-month,no,no,1
72,115.5,8425.35,two-year,yes,yes,0
17,64.7,1093.1,month-to-month,no,yes,1`
  }
};
