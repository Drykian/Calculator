class calculator {
    constructor(firstNumber, secondNumber) {
        this.Fnumber = firstNumber;
        this.Snumber = secondNumber;
        this.calculator = function (operation) {
            switch (operation) {
                case "/":
                    var result = this.Fnumber / this.Snumber;
                    break;

                case "+":
                    var result = this.Fnumber + this.Snumber;
                    break;

                case "-":
                    var result = this.Fnumber - this.Snumber;
                    break;

                case "x":
                    var result = this.Fnumber * this.Snumber;
                    break;

                default: result = this.Fnumber;

            }
            return result
        }
    }
}

var number1 = "";
var number2 = "";
var operation = "";
var result = 0;
var nextNumber = false;

var numbers = new calculator(0, 0);

$(".number").on("click", function () {
    var char = $(this).html();

    if (nextNumber) {
        number2 = number2 + char;
        numbers.Snumber = parseFloat(number2);
        $(".display1").html(numbers.Snumber);
    } else {
        number1 = number1 + char;
        numbers.Fnumber = parseFloat(number1);
        $(".display2").html("");
        $(".display1").html(numbers.Fnumber);
    }
})

$(".symbol").on("click", function () {
    var char = $(this).html();

    switch (char) {
        case "-": case "+": case "/": case "x":
            if (nextNumber && number2 !== "") {
                result = numbers.calculator(operation);
                number1 = ""
                number2 = "";
                numbers.Fnumber = result;
                operation = char;
                $(".display2").html(numbers.Fnumber + char);
                $(".display1").html(numbers.Fnumber);
            } else {
                operation = char;
                numbers.Snumber = numbers.Fnumber;
                $(".display2").html(numbers.Fnumber + char);
                nextNumber = true;
            }

            break;

        case "CE":
            if (nextNumber) {
                number2 = "";
                numbers.Snumber = 0;
                result = 0;
            } else {
                number1 = "";
                numbers.Fnumber = 0;
                result = 0;
                $(".display2").html("");
            }
            $(".display1").html("0");
            break;

        case "C":
            number1 = "";
            number2 = "";
            operation = "";
            numbers.Fnumber = 0;
            numbers.Snumber = 0;
            result = 0;
            nextNumber = false;
            $(".display2").html("");
            $(".display1").html("0");
            break;

        case "⌫":
            if (nextNumber) {
                number2 = number2.slice(0, -1);
                if (number2 === "") {
                    number2 = "0"
                    numbers.Snumber = 0;
                } else {
                    numbers.Snumber = parseFloat(number2);
                }
                $(".display2").html(numbers.Fnumber + operation);
                $(".display1").html(number2);
            } else {
                number1 = number1.slice(0, -1);
                if (number1 === "") {
                    number1 = "0"
                    numbers.Fnumber = 0;
                } else {
                    numbers.Fnumber = parseFloat(number1);
                }
                $(".display1").html(number1);
            }
            break;

        case "±":
            if (nextNumber) {
                numbers.Snumber = numbers.Snumber * -1;
                number2 = numbers.Snumber.toString()
                $(".display2").html(numbers.Fnumber.toString() + operation);
                $(".display1").html(numbers.Snumber.toString());
            } else {
                operation = ""
                numbers.Fnumber = numbers.Fnumber * -1;
                number1 = numbers.Fnumber.toString()
                $(".display1").html(numbers.Fnumber);
            }
            break;

        case ".":
            if (nextNumber) {
                if (!(number2.includes("."))) {
                    if (number2 === "") {
                        numbers.Snumber = 0
                    }
                    number2 = numbers.Snumber.toString() + ".";
                    $(".display2").html(numbers.Fnumber + operation);
                    $(".display1").html(number2);
                }
            } else {
                if (!(number1.includes("."))) {
                    if (number2 === "") {
                        numbers.Fnumber = 0
                    }
                    number1 = numbers.Fnumber.toString() + ".";
                    $(".display2").html("");
                    $(".display1").html(number1);
                }
            }
            break;

        case "=":
            result = numbers.calculator(operation);
            if (operation === "") {
                $(".display2").html(numbers.Fnumber + char);
            } else {
                $(".display2").html(numbers.Fnumber + operation + numbers.Snumber + char);
            }
            $(".display1").html(result);
            number1 = "";
            number2 = "";
            numbers.Fnumber = result;
            nextNumber = false
            break;

        default: console.log(char);

    }
})
