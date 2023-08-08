import PropTypes from "prop-types";

const Index = ({ onChange }) => {
  return (
    <>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={onChange}
        />
        <label className="form-check-label">
          I agree to terms and condition
        </label>
      </div>
    </>
  );
};
Index.propTypes = {
  onChange: PropTypes.func,
};

export default Index;
