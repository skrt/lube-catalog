tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#0a0ac2',
          hover: '#080892',
          content: '#f3f4fe',
        },
        'secondary': {
          DEFAULT: '#e8e8fd',
          hover: '#e0e0f5',
        },
        'base-content': 'rgb(16 16 22 / <alpha-value>)',
        'base-200': '#f8f8fa',
        'base-300': '#eeeef2',
        'error': {
          DEFAULT: '#c94043',
          hover: '#b7393c',
          content: '#fff5f5',
          'bg': '#f7e2e3',
        },
        'success': {
          DEFAULT: '#479d72',
          content: '#f5fef9',
          'bg': '#e3f0ea',
        },
        'warning': {
          DEFAULT: '#de781f',
          content: '#fffcf8',
          'bg': '#faebdd',
        },
        'info': {
          DEFAULT: '#535671',
          content: '#f2f4ff',
          'bg': '#e5e6ea',
        },
      },
      boxShadow: {
        'border-base-content-5': 'inset 0 0 0 1px rgba(16, 16, 22, 0.05)',
        'border-base-content-10': 'inset 0 0 0 1px rgba(16, 16, 22, 0.1)',
        'border-base-content-20': 'inset 0 0 0 1px rgba(16, 16, 22, 0.2)',
        'border-2-base-content-10': 'inset 0 0 0 2px rgba(16, 16, 22, 0.1)',
        'border-2-base-content-20': 'inset 0 0 0 2px rgba(16, 16, 22, 0.2)',
        'border-primary': 'inset 0 0 0 1px #0a0ac2',
        'border-2-primary': 'inset 0 0 0 2px #0a0ac2',
        'border-error': 'inset 0 0 0 1px #c94043',
        'border-2-error': 'inset 0 0 0 2px #c94043',
      },
    },
  },
};
