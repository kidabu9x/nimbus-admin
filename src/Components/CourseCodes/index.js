import React, { Component, Fragment } from "react";
import copyToClipboard from "copy-to-clipboard";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import {
  getCodes,
  deleteCode,
  updateCode,
  setSearchTerm,
  setPage
} from "../Store/CourseCodes/Actions";
import { pushNotification } from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  codes: state.courseCodes.codes,
  count: state.courseCodes.count,
  page: state.courseCodes.page,
  limit: state.courseCodes.limit,
  loading: state.courseCodes.loading,
  deleting: state.courseCodes.deleting,
  updating: state.courseCodes.updating,
  searchTerm: state.courseCodes.searchTerm
});

const mapDispatchToProps = {
  getCodes,
  deleteCode,
  updateCode,
  setSearchTerm,
  setPage,
  pushNotification
};

class Codes extends Component {
  componentDidMount() {
    this.props.getCodes();
  }

  onCopyCode = code => {
    copyToClipboard(code.code);
    this.props.pushNotification(`Đã sao chép '${code.code}'`, {
      variant: "info"
    });
  };

  onDelete = async codeId => {
    const { deleteCode, pushNotification } = this.props;
    await deleteCode(codeId);
    pushNotification("Đã xóa mã", {
      variant: "success"
    });
  };

  onUpdate = async code => {
    const { updateCode, pushNotification } = this.props;
    await updateCode(code);
    pushNotification("Đã lưu mã", {
      variant: "success"
    });
  };

  onSearch = searchTerm => {
    const { setSearchTerm, setPage, getCodes } = this.props;
    setSearchTerm(searchTerm);
    setPage(1);
    getCodes();
  };

  onPageChange = page => {
    const { setPage, getCodes } = this.props;
    setPage(page);
    getCodes();
  };

  render() {
    const {
      loading,
      deleting,
      updating,
      codes,
      searchTerm,
      count,
      page,
      limit
    } = this.props;
    return (
      <Fragment>
        <Header />
        <Body
          loading={loading}
          deleting={deleting}
          updating={updating}
          codes={codes}
          onCopyCode={this.onCopyCode}
          onDelete={this.onDelete}
          onUpdate={this.onUpdate}
          searchTerm={searchTerm}
          onSearch={this.onSearch}
          count={count}
          page={page}
          limit={limit}
          onPageChange={this.onPageChange}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Codes);
