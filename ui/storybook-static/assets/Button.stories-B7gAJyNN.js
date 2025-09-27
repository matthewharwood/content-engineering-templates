function b({label:d="Click me",onClick:p,variant:a="primary",size:r="medium",disabled:s=!1}){const e=document.createElement("button");e.innerText=d,e.disabled=s;const m=["btn"];m.push(`btn--${a}`),m.push(`btn--${r}`),e.className=m.join(" ");const u={padding:r==="small"?"8px 16px":r==="large"?"16px 32px":"12px 24px",fontSize:r==="small"?"14px":r==="large"?"18px":"16px",backgroundColor:a==="primary"?"#0066cc":a==="secondary"?"#6c757d":"transparent",color:a==="primary"||a==="secondary"?"white":"#0066cc",border:a==="outline"?"2px solid #0066cc":"none",borderRadius:"4px",cursor:s?"not-allowed":"pointer",opacity:s?"0.5":"1",transition:"all 0.2s ease-in-out",fontFamily:"Arial, sans-serif",fontWeight:"500"};return Object.assign(e.style,u),s||(e.addEventListener("mouseenter",()=>{a==="primary"?e.style.backgroundColor="#0052a3":a==="secondary"?e.style.backgroundColor="#5a6268":a==="outline"&&(e.style.backgroundColor="#0066cc",e.style.color="white")}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor=u.backgroundColor,e.style.color=u.color})),p&&e.addEventListener("click",p),e}const y={title:"Components/Button",tags:["autodocs"],render:d=>b(d),argTypes:{label:{control:"text"},variant:{control:{type:"select"},options:["primary","secondary","outline"]},size:{control:{type:"select"},options:["small","medium","large"]},disabled:{control:"boolean"},onClick:{action:"clicked"}}},n={args:{label:"Primary Button",variant:"primary",size:"medium",disabled:!1}},o={args:{label:"Secondary Button",variant:"secondary",size:"medium",disabled:!1}},t={args:{label:"Outline Button",variant:"outline",size:"medium",disabled:!1}},l={args:{label:"Small Button",variant:"primary",size:"small",disabled:!1}},i={args:{label:"Large Button",variant:"primary",size:"large",disabled:!1}},c={args:{label:"Disabled Button",variant:"primary",size:"medium",disabled:!0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
    disabled: false
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
    disabled: false
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'medium',
    disabled: false
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'small',
    disabled: false
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'large',
    disabled: false
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};const g=["Primary","Secondary","Outline","Small","Large","Disabled"];export{c as Disabled,i as Large,t as Outline,n as Primary,o as Secondary,l as Small,g as __namedExportsOrder,y as default};
