import React, { Component } from 'react';
import AutocompleteFormItem from 'view/shared/form/items/AutocompleteFormItem';
import SignService from 'modules/sign/signService';
import SignFormModal from 'view/sign/form/SignFormModal';
import { connect } from 'react-redux';
import selectors from 'modules/sign/signSelectors';

class SignAutocompleteFormItem extends Component {
  state = {
    modalVisible: false,
  };

  doCloseModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  doOpenModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  doCreateSuccess = (record) => {
    const { form, name, mode } = this.props;

    if (mode && mode === 'multiple') {
      form.setFieldValue(name, [
        ...(form.values[name] || []),
        record,
      ]);
    } else {
      form.setFieldValue(name, record);
    }

    this.doCloseModal();
  };

  fetchFn = (value, limit) => {
    return SignService.listAutocomplete(value, limit);
  };

  mapper = {
    toAutocomplete(value) {
      if (!value) {
        return undefined;
      }

      const key = value.id;
      let label = value.label;

      if (value['id']) {
        label = value['id'];
      }

      return {
        key,
        label,
      };
    },

    toValue(value) {
      if (!value) {
        return undefined;
      }

      return {
        id: value.key,
        label: value.label,
      };
    },
  };

  render() {
    const { form, ...rest } = this.props;

    return (
      <React.Fragment>
        <AutocompleteFormItem
          {...rest}
          fetchFn={this.fetchFn}
          mapper={this.mapper}
          onOpenModal={this.doOpenModal}
        />

        <SignFormModal
          visible={this.state.modalVisible}
          onCancel={this.doCloseModal}
          onSuccess={this.doCreateSuccess}
        />
      </React.Fragment>
    );
  }
}

const select = (state) => ({
  hasPermissionToCreate: selectors.selectPermissionToCreate(
    state,
  ),
});

export default connect(select)(SignAutocompleteFormItem);
