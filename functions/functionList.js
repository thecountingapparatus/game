import { FunctionBase } from "./functionClass.js";
import { gamma } from "../factions/factorial.js";

//Subclasses
class NChooseR extends FunctionBase {
  constructor(name, unlock, syntax, input1, input2) {
    super(
      name,
      unlock,
      syntax,
      (input1, input2) =>
        gamma(input1 + 1) / (gamma(input2 + 1) * gamma(input1 - input2 + 1))
    ); //n!/ (r! (n−r)!)
  }
}

class Logarithm extends FunctionBase {
  constructor(name, unlock, syntax, base) {
    super(name, unlock, syntax, (input) => Math.log(input) / Math.log(base));
  }
}
class SingleNumSeq extends FunctionBase {
  constructor(name, unlock, syntax, num) {
    super(name, unlock, syntax, (input) => num);
  }
}

class Operator extends FunctionBase{
  constructor (name, unlock, symbol, evaluate){
    super(name, unlock, symbol, evaluate);
  }
}

class QIntegral extends FunctionBase {
  constructor(name, unlock, syntax, integrand) {
    super(name, unlock, syntax, function (a, b) {
      var points = [
        [0.2025782419255613, 0.0],
        [0.1984314853271116, -0.2011940939974345],
        [0.1984314853271116, 0.2011940939974345],
        [0.1861610000155622, -0.3941513470775634],
        [0.1861610000155622, 0.3941513470775634],
        [0.1662692058169939, -0.5709721726085388],
        [0.1662692058169939, 0.5709721726085388],
        [0.1395706779261543, -0.7244177313601701],
        [0.1395706779261543, 0.7244177313601701],
        [0.1071592204671719, -0.8482065834104272],
        [0.1071592204671719, 0.8482065834104272],
        [0.0703660474881081, -0.937273392400706],
        [0.0703660474881081, 0.937273392400706],
        [0.0307532419961173, -0.9879925180204854],
        [0.0307532419961173, 0.9879925180204854],
      ];
      var output = 0;
      function f(x) {
        if (b === Infinity) {
          //new integrand(x) = old integrand(1 / x - 1) / x ** 2, a=0, b=1
          //new f = new integrand((x + 1) / 2) / 2 = old integrand(1 / ((x+1)/2) - 1) ((x+1)/2)**2
          integrand = (x) => integrand(1/x - 1) / x**2; a=0; b=1
        }
        return (integrand((x * (b - a)) / 2 + (a + b) / 2) * (b - a)) / 2;
      }
      for (var i = 0; i < points.length; i++) {
        output += points[i][0] * f(points[i][1]);
      }
      return output;
      //15 point gaussian quadrature
    });
  }
}
//Functions (organize by Unlock)
const FUNCTIONS = {
  A: new FunctionBase("Ackermann Function", "A", "A(a,b)", function (a, b) {
    switch (a) {
      case 0:
        return b + 1;
      case 1:
        return b + 2;
      case 2:
        return 2 * b + 3;
      case 3:
        return 2 ** (b + 3) - 3;
      case 4:
        if (b === 0) {
          return 13;
        } else if (b === 1) {
          return 65533;
        } else {
          return Infinity;
        }
      case 5:
        if (b === 0) {
          return 65533;
        } else {
          return Infinity;
        }
      default:
        return Infinity;
    }
  }),

  B: new FunctionBase(
    "Beta Function",
    "B",
    "B(x,y)",
    (x, y) => (gamma(x + 1) * gamma(y + 1)) / gamma(x + y + 1)
  ),

  C: new FunctionBase(
    "Catalan Numbers",
    "C",
    "C(x)",
    (x) => gamma(2 * x + 1) / gamma(x + 2) / gamma(x + 1)
  ),

  H: new FunctionBase("Harmonic Numbers", "H", "H(a,b)", function (a, b) {
    let output = 0;
    for (let i = 1; i <= a; i++) {
      output += 1 / i ** b;
    }
    return output;
  }),

  L: new FunctionBase(
    "Lucas Numbers",
    "L",
    "L(x)",
    (x) => ((1 + Math.sqrt(5)) / 2) ** x + ((1 - Math.sqrt(5)) / 2) ** x
  ),

  AF: new FunctionBase("Alternating Factorial", "AF", "x¡!", function (x) {
    let output = 0;
    for (let i = 1; i <= x; i++) {
      output += gamma(i + 1) * (-1) ** (x - i);
    }
    return output
  }),

  AT: new FunctionBase("Area of a Triangle", "AT", "🔺(a,b,c)", (a, b, c) =>
    Math.sqrt((-a + b + c) * (a - b + c) * (a + b - c) * (a + b + c))
  ),

  CF: new FunctionBase("Central Factorial", "CF", "x^[!]", function (x) {
    let output = 0;
    for (let i = 1; i <= x - 2; i++) {
      for (let j = i + 1; j <= x - 1; j++) {
        output += i ** 2 * j ** 2;
      }
    }
    return output;
  }),

  DP: new FunctionBase("Ditigal Product", "DP", "(D*n)", function (x) {
    var output = 1;
    for (const i of x.toString()) {
      output *= i.parseInt();
    }
    return output;
  }),

  FF: new FunctionBase(
    "Falling Factorial",
    "FF",
    "x_n",
    (x, n) => gamma(x + 1) / gamma(x - n + 1)
  ),

  SIN: new FunctionBase("Sine", "SIN", "sin(x)", Math.sin),

  TN: new NChooseR("Triangular Numbers", "TN", "T(x)", (x) => --x, 2),

  LN: new Logarithm("Natural Log", "LN", "ln(x)", Math.E),
  
  LOG10: new Logarithm("Logarithm", "LOG", "log10(x)", 10),
  
  LOG2: new Logarithm("Binary Logarithm", "BL", "log2(x)", 2),
  
  CHOOSE: new NChooseR("nCr", "CHOOSE", "xCy"),
  
  ZERO: new SingleNumSeq("All Zeros Sequence", "ZERO", "zero(x)", 0),
  
  ONE: new SingleNumSeq("All Ones Sequence", "ONE", "one(x)", 1),
  
  TWO: new SingleNumSeq("All Twos Sequence", "TWO", "two(x)", 2),
  
  THREE: new SingleNumSeq("All Threes Sequence", "THREE", "three(x)", 3),
  
  FOUR: new SingleNumSeq("All Fours Sequence", "FOUR", "four(x)", 4),
  
  FIVE: new SingleNumSeq("All Fives Sequence", "FIVE", "five(x)", 5),
  
  SIX: new SingleNumSeq("All Sixes Sequence", "SIX", "six(x)", 6),
  
  SEVEN: new SingleNumSeq("All Sevens Sequence", "SEVEN", "seven(x)", 7),
  
  EIGHT: new SingleNumSeq("All Eights Sequence", "EIGHT", "eight(x)", 8),
  
  NINE: new SingleNumSeq("All Nines Sequence", "NINE", "nine(x)", 9),
  
  TEN: new SingleNumSeq("All Tens Sequence", "TEN", "ten(x)", 10),
  
  ELEVEN: new SingleNumSeq("All 11 Albanias", "ELEVEN", "🇦🇱(x)", 11),
  
  TWELVE: new SingleNumSeq("Those 12 bees", "TWELVE", "🐝(x)", 12),
  
  ADDITION: new Operator("Addition", "ADD", "+", (x,y) => x+y),
  
  SUBTRACTION: new Operator("Subtraction", "SUB", "-", (x,y) => x-y),

  MULTIPLICATION: new Operator("Multiply", "MLT", "*", (x,y) => x*y),
  
  DIVISION: new Operator("Addition", "DIV", "/", (x,y) => x/y),
  
  EXPONENTIATION: new Operator("Power", "POW", "+", (x,y) => x**y),
  
  FACTORIAL: new Operator("Factorial", "PI", "!", (x) => gamma(x+1)),
  
  MODULO: new Operator("Modulo", "MOD", "%", (x,y) => x%y),
  
  PREDECESSOR: new Operator("Predecessor", "PRE", "--", (x,y) => --x),
  
  SUCCESSOR: new Operator("Successor", "ADD", "++", (x,y) => ++x),
};
// trole !
