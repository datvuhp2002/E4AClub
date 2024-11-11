import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Input from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";

// Define the types for the ref methods
interface SimpleCaptchaRef {
  validateCaptcha: () => boolean;
  resetCaptcha: () => void;
}

// Define props type if needed, for now it's empty as no props are passed
interface SimpleCaptchaProps {}

const SimpleCaptcha = forwardRef<SimpleCaptchaRef, SimpleCaptchaProps>(
  (props, ref) => {
    const [captchaText, setCaptchaText] = useState<string>(""); // Mã captcha được sinh ra
    const [inputValue, setInputValue] = useState<string>(""); // Người dùng nhập
    const canvasRef = useRef<HTMLCanvasElement>(null); // Ref của canvas

    // Hàm sinh mã CAPTCHA ngẫu nhiên
    const generateCaptcha = (): string => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 4; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const drawCaptcha = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Đặt kích thước cho canvas
        canvas.height = 50;

        // Làm mới canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Tạo nền ngẫu nhiên
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Vẽ text CAPTCHA
        ctx.font = "30px Arial";
        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";

        const captcha = generateCaptcha(); // Sinh ra mã CAPTCHA
        setCaptchaText(captcha); // Lưu lại mã CAPTCHA

        // Vẽ từng ký tự với một chút lệch vị trí
        for (let i = 0; i < captcha.length; i++) {
          const x = 20 + i * 20;
          const y = 25 + Math.random() * 10; // Lệch vị trí chữ ngẫu nhiên
          ctx.fillText(captcha[i], x, y);
        }

        // Vẽ nhiễu để làm cho CAPTCHA khó đọc hơn
        for (let i = 0; i < 5; i++) {
          ctx.strokeStyle = "#ccc";
          ctx.beginPath();
          ctx.moveTo(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
          ctx.lineTo(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
          ctx.stroke();
        }
      }
    };

    useEffect(() => {
      drawCaptcha();
    }, []);

    useImperativeHandle(ref, () => ({
      validateCaptcha: () => {
        return inputValue === captchaText;
      },
      resetCaptcha: () => {
        drawCaptcha();
        setInputValue("");
      },
    }));

    return (
      <div>
        <div className="d-flex align-items-center w-100">
          <canvas className="w-100" ref={canvasRef} />
        </div>
        <Input
          name="captcha"
          leftIcon={<FontAwesomeIcon icon={faBarcode} />}
          type="text"
          placeholder="Nhập mã captcha"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLocaleUpperCase())}
        />
      </div>
    );
  }
);

SimpleCaptcha.displayName = "SimpleCaptcha";

export default SimpleCaptcha;
