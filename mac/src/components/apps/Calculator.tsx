import {
  useCallback,
  useEffect,
  useState,
  HTMLAttributeAnchorTarget,
  ReactNode
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface WindowProps {
  active: boolean;
}

interface ButtonProps {
  className?: string;
  href?: string;
  icon?: IconProp;
  target?: HTMLAttributeAnchorTarget;
  children?: ReactNode;
  [key: string]: unknown;
}

function Button({ className, href, children, icon, target, ...props }: ButtonProps) {
  const classNames = ["flex-1", "rounded-lg", "text-xl"];
  if (className != null) classNames.push(className);

  if (href != null) {
    classNames.push("inline-block");

    return (
      <a
        {...props}
        href={href}
        target={target ?? "_blank"}
        rel="noreferrer"
        tabIndex={0}
        className={classNames.join(" ")}
      >
        {children}
        <FontAwesomeIcon icon={icon ?? faExternalLink} />
      </a>
    );
  } else {
    return (
      <button {...props} tabIndex={0} className={classNames.join(" ")}>
        {children}
        {icon != null ? <FontAwesomeIcon icon={icon} /> : null}
      </button>
    );
  }
}

export function Calculator({ active }: WindowProps) {
  const [input, setInput] = useState<string | null>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [isIntermediate, setIsIntermediate] = useState(false);

  const reset = useCallback(() => {
    setInput("0");
    setFirstNumber(null);
    setSecondNumber(null);
    setOperation(null);
  }, []);

  const addInput = useCallback(
    (string: string) => {
      let hasReset = false;
      if (secondNumber != null) {
        if (isIntermediate && input != null) {
          setFirstNumber(parseFloat(input));
          setSecondNumber(null);
          setInput(null);
        } else {
          reset();
        }
        hasReset = true;
      }

      if (string === "." && input?.includes(".")) return;

      if (string === "-") {
        if (input === "0") {
          setInput("-0");
        } else if (input != null) {
          setInput((parseFloat(input) * -1).toString());
        }
      } else if (string === "%" && input != null) {
        setInput((parseFloat(input) / 100).toString());
      } else if (input === "0" || input === "-0" || input == null || hasReset) {
        if (string === ".") {
          setInput(input === "-0" ? "0." : "0.");
        } else {
          setInput(input === "-0" ? "-" + string : string);
        }
      } else {
        setInput(input + string);
      }
    },
    [input, isIntermediate, reset, secondNumber]
  );

  const calculate = useCallback(
    (intermediate = false) => {
      if (firstNumber != null && input != null) {
        setSecondNumber(parseFloat(input));

        const a = firstNumber;
        const b = parseFloat(input);

        let result = 0;
        switch (operation) {
          case "×":
            result = a * b;
            break;
          case "÷":
            result = a / b;
            break;
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
        }

        setInput(result.toString());
      }

      setIsIntermediate(intermediate);
    },
    [firstNumber, input, operation]
  );

  const changeOperation = useCallback(
    (operation: string) => {
      if (firstNumber != null && secondNumber == null) {
        calculate(true);
      } else if (input != null) {
        setFirstNumber(parseFloat(input));
        setSecondNumber(null);
        setInput(null);
      }

      setOperation(operation);
    },
    [calculate, firstNumber, input, secondNumber]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!active) return;

      event.preventDefault();

      switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          addInput(event.key);
          break;
        case ".":
        case ",":
          addInput(".");
          break;
        case "Escape":
          reset();
          break;
        case "=":
        case "Enter":
          calculate();
          break;
        case "*":
          changeOperation("×");
          break;
        case "/":
          changeOperation("÷");
          break;
        case "+":
        case "-":
          changeOperation(event.key);
          break;
        case "%":
          addInput("%");
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, addInput, calculate, changeOperation, reset]);

  let calculation = "";
  if (operation != null)
    calculation = `${firstNumber} ${operation} ${secondNumber != null ? secondNumber + " =" : ""}`;

  return (
    <div className="flex flex-col h-full" bg="#ffffff dark:#000000">
      <div className="flex flex-col justify-center items-end gap-1 h-1/5 p-2">
        <p className="text-gray-500 text-base m-0">{calculation}</p>
        <p className="text-4xl m-0" text="#000000 dark:#ffffff">
          {input ?? firstNumber}
        </p>
      </div>
      <div className="flex flex-col gap-1 h-4/5 p-2">
        <div className="flex gap-1 flex-1" text="#ffffff dark:#000000">
          <Button
            className=""
            bg="#808080 hover:#686868 hover:dark:#c1c1c1 dark:#a5a5a5"
            onClick={reset}
          >
            AC
          </Button>
          <Button
            className=""
            bg="#808080 hover:#686868 hover:dark:#c1c1c1 dark:#a5a5a5"
            onClick={() => {
              addInput("-");
            }}
          >
            +/-
          </Button>
          <Button
            className=""
            bg="#808080 hover:#686868 hover:dark:#c1c1c1 dark:#a5a5a5"
            onClick={() => {
              addInput("%");
            }}
          >
            %
          </Button>
          <Button
            className=""
            text="#000000 dark:#ffffff"
            bg="#f09536 dark:#e07a1f hover:#e07a1f hover:dark:#ff9a2f"
            onClick={() => {
              changeOperation("÷");
            }}
          >
            ÷
          </Button>
        </div>
        <div className="flex gap-1 flex-1" text="#000000 dark:#ffffff">
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("7");
            }}
          >
            7
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("8");
            }}
          >
            8
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("9");
            }}
          >
            9
          </Button>
          <Button
            className=""
            bg="#f09536 dark:#e07a1f hover:#e07a1f hover:dark:#ff9a2f"
            onClick={() => {
              changeOperation("×");
            }}
          >
            ×
          </Button>
        </div>
        <div className="flex gap-1 flex-1" text="#000000 dark:#ffffff">
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("4");
            }}
          >
            4
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("5");
            }}
          >
            5
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("6");
            }}
          >
            6
          </Button>
          <Button
            className=""
            bg="#f09536 dark:#e07a1f hover:#e07a1f hover:dark:#ff9a2f"
            onClick={() => {
              changeOperation("-");
            }}
          >
            -
          </Button>
        </div>
        <div className="flex gap-1 flex-1" text="#000000 dark:#ffffff">
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("1");
            }}
          >
            1
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("2");
            }}
          >
            2
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("3");
            }}
          >
            3
          </Button>
          <Button
            className=""
            bg="#f09536 dark:#e07a1f hover:#e07a1f hover:dark:#ff9a2f"
            onClick={() => {
              changeOperation("+");
            }}
          >
            +
          </Button>
        </div>
        <div className="flex gap-1 flex-1" text="#000000 dark:#ffffff">
          <Button
            className="min-w-[calc(50%-0.125rem)]"
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput("0");
            }}
          >
            0
          </Button>
          <Button
            className=""
            bg="#b7b7b7 dark:#303030 hover:#9e9e9e dark:hover:#4d4d4d"
            onClick={() => {
              addInput(".");
            }}
          >
            .
          </Button>
          <Button
            className=""
            bg="#f09536 dark:#e07a1f hover:#e07a1f hover:dark:#ff9a2f"
            onClick={() => {
              calculate();
            }}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
