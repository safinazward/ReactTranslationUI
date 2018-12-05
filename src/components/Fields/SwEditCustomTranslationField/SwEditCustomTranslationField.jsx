import React, { Component } from "react";
import PropTypes from 'prop-types';
import { AvForm, AvInput } from "availity-reactstrap-validation";

import TranslationService from "../../../services/translationService";

class SwEditCustomTranslationField extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(event, values) {
    if (this.props.translation.text !== this.props.translation.standardText) {
      this.updateCustom(values);
    } else {
      this.addCustom(values);
    }
  }

  updateCustom(values) {
    TranslationService.updateCustomTranslation(
      this.props.locale,
      this.props.translation.key,
      values.text
    ).then(translation => {
      if (this.props.onSave) {
        this.props.onSave(translation);
      }
    });
  }

  addCustom(values) {
    TranslationService.addCustomTranslation(
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
        <AvInput name="text" value={this.props.translation.text} />
      </AvForm>
    ) : (
      <div>{this.props.translation.text}</div>
    );
  }
}

SwEditCustomTranslationField.propTypes = {
	translation: PropTypes.shape({
		key: PropTypes.string,
		text: PropTypes.string,
		standardText: PropTypes.string
	}),
	locale: PropTypes.string,
  editing: PropTypes.bool,
  onSave: PropTypes.func
}

SwEditCustomTranslationField.defaultProps = {
	translation: { key:'', text:'', standardText:''},
	locale:'',
  editing: false
}

export default SwEditCustomTranslationField;
