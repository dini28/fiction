const NewsMasonry = ({ items }) => {
    return (
        <div className="news-masonry">
            {items?.map((item) => (
                <div key={item.id} className="news-card">
                    <div className="card-header">
                        <span className="card-tag">{item.category}</span>
                        <span className="card-date">{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description || "In-depth intelligence report pending. Operator discretion advised."}</p>
                    <div className="card-footer">
                        <span className="read-time">5 MIN READ</span>
                        <div className="card-arrow"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsMasonry;
