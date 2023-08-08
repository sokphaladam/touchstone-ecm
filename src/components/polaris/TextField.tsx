import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField as PolarisTextField,
  TextFieldProps,
} from "@shopify/polaris";

type Props = TextFieldProps & { required?: boolean };

const TextField = ({ required, ...props }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = ref.current;
    const input = element && element.querySelector("input");

    if (input) {
      input.required = !!required;
    }
  }, [ref, required]);

  return (
    <div ref={ref}>
      <PolarisTextField {...(props as any)} />
    </div>
  );
};

TextField.propTypes = {
  required: PropTypes.bool.isRequired,
};

TextField.defaultProps = {
  required: false,
};

export default TextField;
