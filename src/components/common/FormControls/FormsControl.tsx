import React, { FC } from "react";
import styles from "./FormControls.module.css";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlPropsType = {
  children: React.ReactNode,
  meta: WrappedFieldMetaProps
}

const FormControl: FC<FormControlPropsType> = ({meta: {error, touched}, children}) => {
   const hasError = error && touched;
   return (
     <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
       <div>
         {children}
       </div>
       { hasError && <span>{error}</span> }
     </div>
   );
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
  //  const {input, meta, child, ...restProps} = props;
   const {input, meta, ...restProps} = props;
   return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
   const {input, meta, ...restProps} = props;
   return <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
}

export function createField<FormKeys extends string>(
   placeholder: string | undefined,
   name: FormKeys,
   validators: Array<FieldValidatorType>,
   component: FC<WrappedFieldProps>,
   props = {},
   text = ''
) {
   return (
      <div>
         <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
         {text}
      </div>
   );
}