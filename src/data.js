export const steps = [
  { index: 1, label: "Your Info" },
  { index: 2, label: "Select Plan" },
  { index: 3, label: "Add Ons" },
  { index: 4, label: "Summary" },
];

export const stepControllersProps = {
  1: {
    buttonLabel: "Next step",
  },
  2: {
    buttonLabel: "Next step",
    allowGoStepBack: true,
  },
  3: {
    buttonLabel: "Next step",
    allowGoStepBack: true,
  },
  4: {
    buttonLabel: "Confirm",
    allowGoStepBack: true,
  },
  5: {
    navigationButtons: false,
  },
};

export const firstStepForm = [
  {
    label: "Name",
    name: "name",
    type: "text", // TypeScript would help here to allow just text | email | tel
    placeholder: "e.g. Arthur Conan Doyle",
    rules: {
      required: {
        value: true,
        message: "Name is required",
      },
      minLength: {
        value: 2,
        message: "The minimum length is 2 characters",
      },
    },
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "e.g. acdoyle@bakerstreet.com",
    rules: {
      required: {
        value: true,
        message: "Email address is required",
      },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format",
      },
    },
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "e.g. 07534 000 122",
    rules: {
      required: {
        value: true,
        message: "Phone number is required",
      },
      pattern: {
        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        message: "Entered value does not match phone format",
      },
    },
  },
];

function createInitialFirstStepState() {
  return Array(firstStepForm.length).fill("");
}

export const initialFirstStepState = createInitialFirstStepState();

export const billingPlanRadios = {
  name: "billing",
  legend: "Select your billing plan",
  radios: [
    {
      id: "arcade",
      value: "arcade",
      label: "Arcade",
      description: {
        monthly: {
          value: 9,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 90,
          currency: "USD",
          period: "year",
          periodShort: "yr",
          additionalInfo: "2 months free",
        },
      },

      svgIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="#FFAF7E"/><path fill="#FFF" fill-rule="nonzero" d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"/></g></svg>',
    },
    {
      id: "advanced",
      value: "advanced",
      label: "Advanced",
      description: {
        monthly: {
          value: 12,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 120,
          currency: "USD",
          period: "year",
          periodShort: "yr",
          additionalInfo: "2 months free",
        },
      },
      svgIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="#F9818E"/><path fill="#FFF" fill-rule="nonzero" d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"/></g></svg>',
    },
    {
      id: "pro",
      value: "pro",
      label: "Pro",
      description: {
        monthly: {
          value: 15,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 150,
          currency: "USD",
          period: "year",
          periodShort: "yr",
          additionalInfo: "2 months free",
        },
      },
      svgIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="#483EFF"/><path fill="#FFF" fill-rule="nonzero" d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"/></g></svg>',
    },
  ],
};

export const radioToggle = {
  name: "period",
  legend: "How would you like to be charged?",
  radios: [
    {
      id: "monthly",
      value: "monthly",
      label: "Monthly",
      period: "month",
    },
    {
      id: "yearly",
      value: "yearly",
      label: "Yearly",
      period: "year",
    },
  ],
};

export const addOnsCheckboxes = {
  name: "addons",
  legend: "Pick your add-ons",
  checkboxes: [
    {
      id: "onlineservice",
      value: "onlineservice",
      label: "Online Service",
      description: "Access to multiplayer games",
      price: {
        monthly: {
          value: 1,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 10,
          currency: "USD",
          period: "year",
          periodShort: "yr",
        },
      },
    },
    {
      id: "largerstorage",
      value: "largerstorage",
      label: "Larger Storage",
      description: "Extra 1TB of cloud save",
      price: {
        monthly: {
          value: 2,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 20,
          currency: "USD",
          period: "year",
          periodShort: "yr",
        },
      },
    },
    {
      id: "customizableprofile",
      value: "customizableprofile",
      label: "Customizable profile",
      description: "Custom theme on your profile",
      price: {
        monthly: {
          value: 2,
          currency: "USD",
          period: "month",
          periodShort: "mo",
        },
        yearly: {
          value: 20,
          currency: "USD",
          period: "year",
          periodShort: "yr",
        },
      },
    },
  ],
};

function createInitialAddOns() {
  const initialAddOnsOne = {};
  addOnsCheckboxes.checkboxes.forEach(
    (item, i) => (initialAddOnsOne[i] = false)
  );
  return initialAddOnsOne;
}

export const initialAddOns = createInitialAddOns();
