import { defineComponent, h } from 'vue'

/**
 * Προσωρινό Vue wrapper για το React prototype Flow_Os ERP που έστειλες.
 *
 * Το snippet που μοιράστηκες είναι React/JSX και αποθηκεύτηκε στο
 * `playground/app/components/FlowOsApp.user-snippet.jsx` για μεταφορά/μετατροπή.
 */
export default defineComponent({
  name: 'FlowOsApp',
  setup() {
    return () =>
      h('div', { style: 'padding: 1rem; border: 1px dashed #999; border-radius: 8px;' }, [
        h('strong', 'Το snippet Flow_Os καταχωρήθηκε'),
        h('p', { style: 'margin-top: 0.5rem;' }, 'Η υλοποίηση είναι σε React και αποθηκεύτηκε για μετατροπή σε Vue.')
      ])
  }
})
