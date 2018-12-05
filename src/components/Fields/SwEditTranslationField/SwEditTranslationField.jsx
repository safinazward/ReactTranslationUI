import React, { Component } from "react";
import PropTypes from 'prop-types';
import { AvForm, AvInput } from "availity-reactstrap-validation";

import TranslationService from "../../../services/translationService";

class SwEditTranslationField extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(event, values) {
    TranslationService.updateTranslation(
      this.props.locale,
      this.props.translation.key,
      values.text
    ).then(translation => {
      if (this.props.onSave) {
        this.props.onSave(translation);
      }
    });
  }

  render() {
    return this.props.editing ? (
      <AvForm onValidSubmit={this.save}>
        <AvInput name="text" value={this.props.translation.standardText} />
      </AvForm>
    ) : (
      <div>{this.props.translation.standardText}</div>
    );
  }
}

SwEditTranslationField.propTypes = {
	translation: PropTypes.shape({
		key: PropTypes.string,
		text: PropTypes.string,
		standardText: PropTypes.string
	}),
	locale: PropTypes.string,
  editing: PropTypes.bool,
  onSave: PropTypes.func
}

SwEditTranslationField.defaultProps = {
	translation: { key:'', text:'', standardText:''},
	locale:'',
  editing: false
}

export default SwEditTranslationField;

