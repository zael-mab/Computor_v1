# Computor V1

## Description
Computer V1 is a command-line javascript program that solves polynomial equations of the second degree or lower. The program shows the equation in its reduced form, the degree of the equation, and its solution(s). If it makes sense, the program also shows the polarity of the discriminant.


## Basic format:

Where <equation> is a polynomial equation in the form A * X^p + B * X^(p-1) + ... + Z * X^0 = 0  where A, B, Z are real numbers. / A,B,Z ∈ ℝ.

## Usage:

To run the program, use the following command:

   1. Clone the repository 
  
   2. Navigate to the project directory 
  
   3. ```node computor.js "<equation>"```  Replace ```<equation>``` with your polynomial equation.
  
  Here's an example:
  ```node computor.js "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"```

![screen8](https://user-images.githubusercontent.com/50439217/150662044-e9e70d74-bee1-447d-b1e8-22563583c13c.gif)

## Authors

- [zael-mab](#zael-mab)  - initial work

## Acknowledgements

This project is a part of the 42 School curriculum.
