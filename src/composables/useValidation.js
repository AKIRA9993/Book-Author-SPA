import { ref, reactive, computed } from 'vue'

export function useValidation() {
  // Shared errors object for simple-API consumers
  const errors = reactive({})

  // Validation rules (curried where convenient to match usage in forms)
  const rules = {
    required: (message = 'This field is required') => (value) => {
      if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
        return message
      }
      return null
    },

    minLength: (min) => (value) => {
      if (value && value.length < min) {
        return `Must be at least ${min} characters`
      }
      return null
    },

    maxLength: (max) => (value) => {
      if (value && value.length > max) {
        return `Must be no more than ${max} characters`
      }
      return null
    },

    url: (message = 'Please enter a valid URL') => (value) => {
      if (!value) return null
      try { new URL(value) } catch { return message }
      return null
    },

    year: (min = 1800, max = new Date().getFullYear()) => (value) => {
      if (value === '' || value === null || value === undefined) return 'Year is required'
      const year = parseInt(value)
      if (isNaN(year) || year < min || year > max) {
        return `Year must be between ${min} and ${max}`
      }
      return null
    },

    authorExists: (authors = []) => (value) => {
      if (!value) return 'Please select an author'
      const exists = authors.some(a => String(a.id) === String(value))
      return exists ? null : 'Selected author does not exist'
    }
  }

  // Simple validation runner used by forms like BookForm
  function validateForm(formData, schema) {
    clearErrors()
    let isValid = true
    for (const field in schema) {
      const validators = schema[field]
      for (const validate of validators) {
        const error = validate(formData[field])
        if (error) {
          errors[field] = error
          isValid = false
          break
        }
      }
    }
    return isValid
  }

  function clearErrors() {
    Object.keys(errors).forEach(k => delete errors[k])
  }

  // Advanced API (schema-based with touched state)
  function createFormValidation(schema) {
    const localErrors = reactive({})
    const touched = reactive({})

    function validateField(fieldName, value) {
      const fieldRules = schema[fieldName] || []
      localErrors[fieldName] = null
      for (const rule of fieldRules) {
        const err = rule(value)
        if (err) { localErrors[fieldName] = err; break }
      }
      return localErrors[fieldName]
    }

    function validateAll(formData) {
      let ok = true
      for (const key in schema) {
        const e = validateField(key, formData[key])
        if (e) ok = false
      }
      return ok
    }

    function resetValidation() {
      Object.keys(localErrors).forEach(k => delete localErrors[k])
      Object.keys(touched).forEach(k => touched[k] = false)
    }

    const isFormValid = computed(() => Object.values(localErrors).every(e => !e))

    return { errors: localErrors, touched, validateField, validateForm: validateAll, resetValidation, isFormValid }
  }

  const currentYear = new Date().getFullYear()

  return {
    // simple API
    errors,
    rules,
    validateForm,
    clearErrors,

    // advanced API
    createFormValidation,
    currentYear
  }
}