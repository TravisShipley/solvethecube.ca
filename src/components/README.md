# Vue Components 

## Notes 

### Component/instance options orderRECOMMENDED
1. Side Effects (triggers effects outside the component)
  - el

2. Global Awareness (requires knowledge beyond the component)
  - name
  - parent

3. Component Type (changes the type of the component)
  - functional

4. Template Modifiers (changes the way templates are compiled)
  - delimiters
  - comments

5. Template Dependencies (assets used in the template)
  - components
  - directives
  - filters

6. Composition (merges properties into the options)
  - extends
  - mixins

7. Interface (the interface to the component)
  - inheritAttrs
  - model
  - props/propsData

8. Local State (local reactive properties)
  - data
  - computed
  - Events (callbacks triggered by reactive events)

9. Lifecycle Events (in the order they are called)
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - activated
  - deactivated
  - beforeDestroy
  - destroyed